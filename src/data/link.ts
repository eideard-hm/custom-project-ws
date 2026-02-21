import type { ILink } from '../types';

export const links: ILink[] = [
  {
    href: '/',
    label: 'Conectar Dispositivo',
    icon: 'fa-solid fa-link',
    disabled: true,
    public: false,
  },
  {
    href: '/save',
    label: 'Registrar Usuarios',
    icon: 'fa-solid fa-floppy-disk',
    disabled: false,
    public: false,
  },
  {
    href: '/sphipment-order',
    label: 'Consultar Usuarios',
    icon: 'fa-solid fa-users-line',
    disabled: false,
    public: false,
  },
  {
    href: '/send-messages',
    label: 'Envíar Mensajes',
    icon: 'fa-solid fa-paper-plane',
    disabled: false,
    public: false,
  },
  {
    href: '/reports',
    label: 'Reportes',
    icon: 'fa-solid fa-chart-simple',
    disabled: false,
    public: true,
  },
];

export const PUBLIC_ROUTES = ['/reports'];
