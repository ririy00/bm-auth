export type ServiceName = 'api-gateway' | 'auth-service' | 'payment-service';

export interface ServiceHealth {
  service: ServiceName;
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
}
