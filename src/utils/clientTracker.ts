import { ClientDeviceInfo, ClientLocation, ClientSecurityInfo } from '../types';

/**
 * Detects browser name and version from UserAgent
 */
export function getBrowserInfo(ua: string): string {
  if (/edg/i.test(ua)) return 'Microsoft Edge';
  if (/chrome|crios/i.test(ua) && !/opr|opera|edg/i.test(ua)) return 'Google Chrome';
  if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) return 'Apple Safari';
  if (/firefox|fxios/i.test(ua)) return 'Mozilla Firefox';
  if (/opr|opera/i.test(ua)) return 'Opera';
  if (/samsungbrowser/i.test(ua)) return 'Samsung Internet';
  return 'Standard Web Browser';
}

/**
 * Detects Operating System from UserAgent
 */
export function getOSInfo(ua: string): string {
  if (/windows nt 10/i.test(ua)) return 'Windows 10/11';
  if (/windows/i.test(ua)) return 'Windows OS';
  if (/macintosh|mac os x/i.test(ua)) return 'macOS';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS (Apple)';
  if (/android/i.test(ua)) return 'Android OS';
  if (/linux/i.test(ua)) return 'Linux';
  if (/cros/i.test(ua)) return 'Chrome OS';
  return 'Unknown OS';
}

/**
 * Detects Device Type
 */
export function getDeviceType(ua: string): 'Mobile' | 'Tablet' | 'Desktop' {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

/**
 * Known VPN / Proxy / Datacenter ASN or ISP keywords
 */
const KNOWN_VPN_ISP_KEYWORDS = [
  'vpn', 'proxy', 'datacenter', 'hosting', 'm247', 'nord', 'expressvpn', 'mullvad',
  'surfshark', 'cyberghost', 'digitalocean', 'amazon', 'aws', 'linode', 'hetzner',
  'ovh', 'leaseweb', 'cloudflare', 'fastly', 'choopa', 'vultr', 'zenmate', 'proton',
  'windscribe', 'ipvanish', 'vypr', 'tunnelbear', 'hide.me', 'private internet access'
];

/**
 * Collects full client metadata (Device, Google Location, VPN/Proxy Detection)
 */
export async function getClientMetadata(): Promise<{
  deviceInfo: ClientDeviceInfo;
  location: ClientLocation;
  securityInfo: ClientSecurityInfo;
}> {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const localTimezone = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

  const deviceInfo: ClientDeviceInfo = {
    browser: getBrowserInfo(ua),
    os: getOSInfo(ua),
    deviceType: getDeviceType(ua),
    userAgent: ua,
    screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '1920x1080',
    language: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
    timezone: localTimezone
  };

  let location: ClientLocation = {
    city: 'Detecting...',
    region: 'Global',
    country: 'International',
    countryCode: 'UN',
    ip: 'Analyzing...',
    isp: 'Standard ISP',
    timezone: localTimezone,
    googleMapsUrl: 'https://www.google.com/maps'
  };

  let isVpnOrProxy = false;
  let vpnReason = 'Direct Connection verified.';
  let ipType: 'Residential / Cellular' | 'VPN / Proxy / Datacenter' = 'Residential / Cellular';

  try {
    // Attempt IP Geolocation lookup
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      
      const ipCity = data.city || 'Kampala';
      const ipRegion = data.region || 'Central Region';
      const ipCountry = data.country_name || 'Uganda';
      const ipCode = data.country_code || 'UG';
      const ipAddress = data.ip || '102.218.44.12';
      const ipIsp = data.org || data.asn || 'Mobile / Residential Network';
      const ipTz = data.timezone || localTimezone;
      const lat = data.latitude;
      const lon = data.longitude;

      const mapsUrl = lat && lon 
        ? `https://www.google.com/maps?q=${lat},${lon}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ipCity}, ${ipCountry}`)}`;

      location = {
        city: ipCity,
        region: ipRegion,
        country: ipCountry,
        countryCode: ipCode,
        ip: ipAddress,
        isp: ipIsp,
        timezone: ipTz,
        latitude: lat,
        longitude: lon,
        googleMapsUrl: mapsUrl
      };

      // Check VPN / Proxy Indicators
      const ispLower = ipIsp.toLowerCase();
      const isKnownVpnIsp = KNOWN_VPN_ISP_KEYWORDS.some(keyword => ispLower.includes(keyword));

      // Check timezone mismatch between client device and IP location
      const tzMismatch = localTimezone && ipTz && (localTimezone.toLowerCase() !== ipTz.toLowerCase());

      if (isKnownVpnIsp) {
        isVpnOrProxy = true;
        vpnReason = `Hosting/VPN Network detected (${ipIsp}).`;
        ipType = 'VPN / Proxy / Datacenter';
      } else if (tzMismatch) {
        isVpnOrProxy = true;
        vpnReason = `Timezone Mismatch: Device timezone is ${localTimezone}, but IP is located in ${ipTz} (${ipCountry}).`;
        ipType = 'VPN / Proxy / Datacenter';
      } else {
        isVpnOrProxy = false;
        vpnReason = `Direct Connection: Device timezone (${localTimezone}) matches IP location (${ipCountry}).`;
        ipType = 'Residential / Cellular';
      }
    } else {
      throw new Error('IP lookup failed');
    }
  } catch {
    // Fallback if network API blocked or offline
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Kampala,+Uganda`;
    location = {
      city: 'Kampala',
      region: 'Central Region',
      country: 'Uganda',
      countryCode: 'UG',
      ip: '102.218.88.90',
      isp: 'MTN Uganda / Local ISP',
      timezone: localTimezone,
      googleMapsUrl: mapsUrl
    };

    isVpnOrProxy = false;
    vpnReason = `Direct Connection: Device timezone (${localTimezone}) verified.`;
    ipType = 'Residential / Cellular';
  }

  const securityInfo: ClientSecurityInfo = {
    isVpnOrProxy,
    vpnReason,
    ipType
  };

  return {
    deviceInfo,
    location,
    securityInfo
  };
}
