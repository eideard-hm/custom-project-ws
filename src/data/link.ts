import type { ILink } from '../types';

export const links: ILink[] = [
  {
    href: './',
    label: 'Conectar Dispositivo',
    icon: 'fa-solid fa-link',
    disabled: true,
  },
  {
    href: 'save',
    label: 'Registrar Usuarios',
    icon: 'fa-solid fa-floppy-disk',
    disabled: false,
  },
  {
    href: 'sphipment-order',
    label: 'Consultar Usuarios',
    icon: 'fa-solid fa-users-line',
    disabled: false,
  },
  {
    href: 'send-messages',
    label: 'Envíar Mensajes',
    icon: 'fa-solid fa-paper-plane',
    disabled: false,
  },
];
