"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useField } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'

// Étendre les props de Payload avec vos props personnalisées
type SelectFormFieldsProps = TextFieldClientProps & {
  title?: string
}

export const SelectFormFields = (props: SelectFormFieldsProps) => {
  const {  path } = props
  
  // Utiliser l'API Payload pour gérer le champ
  const { value, setValue } = useField<string>({ path })
  
  const [currentValue, setCurrentValue] = useState<"left" | "center" | "right">(
    (value as "left" | "center" | "right") || "center"
  )

  useEffect(() => {
    if (value && (value === "left" || value === "center" || value === "right")) {
      setCurrentValue(value)
    }
  }, [value])

  const handleChange = (newValue: "left" | "center" | "right") => {
    setCurrentValue(newValue)
    setValue(newValue)
  }

  return (
    <div className="container">
      <div className={`w-full flex-row items-center`}>
        <div className="flex flex-row items-center pt-24">
          <button
            type="button"
            className={`align-btn${currentValue === "left" ? " selected" : ""}`}
            aria-label="Align left"
            onClick={() => handleChange("left")}
          >
            <Image src="/blocks/textleft.png" alt="Align left" width={35} height={35} className="align-icon" />
          </button>
          <button
            type="button"
            className={`align-btn${currentValue === "center" ? " selected" : ""}`}
            aria-label="Align center"
            onClick={() => handleChange("center")}
          >
            <Image src="/blocks/textcenter.png" alt="Align center" width={35} height={35} className="align-icon" />
          </button>
          <button
            type="button"
            className={`align-btn${currentValue === "right" ? " selected" : ""}`}
            aria-label="Align right"
            onClick={() => handleChange("right")}
          >
            <Image src="/blocks/text right.png" alt="Align right" width={35} height={35} className="align-icon" />
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .align-btn {
          top: 20px;
          padding: 0rem;
          background: #ffffff;
          border: 1px solid #397dff;
          align-items: center;
          justify-content: center;
          transition:
            background 0.2s,
            border 0.2s;
          cursor: pointer;
        }
        .align-btn:hover {
          background: #f0f7ff;
        }
        .align-btn:active {
          background: #e6f0ff;
          box-shadow: 0 0 0 2px #397dff33;
        }
      
        
        .align-btn.selected {
          color: #397dff;
          background: #397dff;
        }
        .align-btn.selected .align-icon {
          filter: brightness(0) invert(1);
        }
        .align-icon {
          width: 35px;
          height: 35px;
          object-fit: contain;
        }
        .align-btn:not(.selected) .align-icon {
          color: #397dff;
        }
      `}</style>
    </div>
  )
}

export default SelectFormFields