import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubdomainService {
  getSubdomain(): string | null {
    const host = window.location.hostname;
    const parts = host.split('.');
    if (parts.length > 1) {
      return parts[0];
    }
    return null;
  }

  isSubdomain(subdomain: string): boolean {
    return this.getSubdomain() === subdomain;
  }
}
