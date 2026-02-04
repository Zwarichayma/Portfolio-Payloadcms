import type { SelectField } from 'payload'

type Overrides = {
  suppliersTypeOverrides?: Partial<SelectField>
}

type suppliersType = (overrides?: Overrides) => [SelectField]

export const suppliersTypeField: suppliersType = (overrides = {}) => {
  const { suppliersTypeOverrides } = overrides

  // @ts-expect-error - ts mismatch Partial<SelectField> with SelectField
  const suppliersTypeField: SelectField = {
    name: 'suppliersType',
    type: 'select',
    index: true,
    label: {
      fr: ' Type de Fournisseurs',
      en: 'Type of Suppliers',
    },
    defaultValue: 'partners',
    options: [
      { value: 'partners', label: { fr: 'Partenaires', en: 'Partners' } },
      { value: 'suppliers', label: { fr: 'Fournisseurs', en: 'Suppliers' } },
    ],
    ...(suppliersTypeOverrides || {}),

    admin: {
      description: {
        fr: "Sélectionnez le type d'entreprise à afficher dans la section logos",
        en: 'Select company type to display in the logos section',
      },

      ...(suppliersTypeOverrides?.admin || {}),
    },
  }

  return [suppliersTypeField]
}
