import { ClientDeviceInfo, ClientLocation, ClientSecurityInfo } from '../types';

/**
 * Clean device classification helper
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
 * Standard client submission metadata helper
 */
export async function getClientMetadata(): Promise<{
  deviceInfo: ClientDeviceInfo;
  location: ClientLocation;
  securityInfo: ClientSecurityInfo;
}> {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const localTimezone = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

  const deviceInfo: ClientDeviceInfo = {
    browser: 'Web Browser',
    os: 'Client Device',
    deviceType: getDeviceType(ua),
    userAgent: ua,
    screenResolution: 'Standard',
    language: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
    timezone: localTimezone
  };

  const location: ClientLocation = {
    city: 'Kampala',
    region: 'Central Region',
    country: 'Uganda',
    countryCode: 'UG',
    ip: 'Direct Client Session',
    isp: 'Client Network',
    timezone: localTimezone,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kampala,+Uganda'
  };

  const securityInfo: ClientSecurityInfo = {
    isVpnOrProxy: false,
    vpnReason: 'Standard Client Session',
    ipType: 'Residential / Cellular'
  };

  return {
    deviceInfo,
    location,
    securityInfo
  };
}
