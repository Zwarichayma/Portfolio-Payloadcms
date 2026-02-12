import type { Field } from 'payload'

export const sidebarField: Field = {
  name: 'showInSidebar',
  type: 'checkbox',
  label: {
    fr: 'Afficher dans la barre latérale',
    en: 'Show in Sidebar',
  },
  defaultValue: true,
  admin: {
    position: 'sidebar',
    description: {
      fr: 'Cochez cette case pour afficher ce bloc dans la barre latérale de navigation',
      en: 'Check this box to display this block in the navigation sidebar',
    },
  },
}
