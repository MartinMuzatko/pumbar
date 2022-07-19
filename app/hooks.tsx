import { useForm } from '@mantine/hooks'
import { ValidationRule, UseFormErrors, UseForm } from '@mantine/hooks/lib/use-form/use-form'
import React, { ReactNode, useState, useEffect } from 'react'
import { ZodType } from 'zod'

interface UseFormInput<T> {
	validationRules?: ValidationRule<T>
	errorMessages?: UseFormErrors<T>
	initialValues: T
}

type ErrorFormatter = (errors: string[]) => ReactNode

export interface UseZodFormInput<T> extends UseFormInput<T> {
	schema: ZodType<T>
	errorFormatter?: ErrorFormatter
}

export interface UseZodForm<T> extends UseForm<T> {
	formErrors?: ReactNode
	setFormErrors: (errors: ReactNode | undefined) => void
}

export function useZodForm<T extends { [key: string]: any }>({
	schema,
	errorFormatter,
	validationRules,
	errorMessages,
	initialValues,
}: UseZodFormInput<T>): UseZodForm<T> {
	const {
		values,
		errors,
		// validate,
		reset,
		setErrors,
		setValues,
		setFieldValue,
		setFieldError,
		validateField,
		resetErrors,
		// onSubmit,
		getInputProps,
	} = useForm({ validationRules, errorMessages, initialValues })

	const [formErrors, setFormErrors] = useState<ReactNode | undefined>(undefined)
	// Copied from useForm
	type ValidationErrors = Record<keyof T, React.ReactNode>

	// Convert Zod errors into ReactNode, with simple default
	const formatter = errorFormatter || ((errors) => errors.join(' '))

	// This could be part of UseFormInput.  Allowing the wrapper hook to do additional validation.
	// This could append to existing errors, or completely replace them.
	// The code shown, appends the errors.  Allowing the default behavior of validationRules & errorMessages.
	const overrideValidation = (isValid: boolean, validationErrors: ValidationErrors) => {
		const parsed = schema.safeParse(values)

		if (!parsed.success) {
			const errors = parsed.error.flatten()

			setFormErrors(!!errors.formErrors.length ? formatter(errors.formErrors) : undefined)

			// Merge existing and Zod field errors
			for (const [name, value] of Object.entries(errors.fieldErrors)) {
				const key = name as keyof T

				validationErrors[key] = !!validationErrors[key] ? (
					// Use a Fragment to merge the errors from differing sources.
					// This assumes that errorMessages & errorFormatter will have similar styles.
					<>
						{validationErrors[key]}
						{formatter(value)}
					</>
				) : (
					formatter(value)
				)
			}
		}

		return {
			isValid: isValid && parsed.success,
			validationErrors,
		}
	}

	// Original validate function with minor additions
	const validate = () => {
		const parsed = schema.safeParse(values)
		const newErrors = !parsed.success ? parsed.error.flatten() : undefined

		const newFormErrors: typeof formErrors = !!newErrors?.formErrors.length
			? formatter(newErrors.formErrors)
			: null

		const newFieldErrors: typeof errors = Object.keys(values).reduce((acc, field) => {
			acc[field as keyof T] = !!newErrors?.fieldErrors[field]
				? formatter(newErrors?.fieldErrors[field] || [''])
				: null

			return acc
		}, {} as ValidationErrors)

		setErrors(newFieldErrors)
		setFormErrors(newFormErrors)
		return parsed.success
	}

	// Have to completely replace the original onSubmit so that it can call the new validate fn.
	// No changes would be needed to onSubmit if overrideValidation() was implemented in validate().
	const onSubmit = (handleSubmit: (values: T) => any) => (event?: React.FormEvent) => {
		event && event.preventDefault()
		validate() && handleSubmit(values)
	}

	return {
		values,
		errors,
		validate,
		reset,
		setErrors,
		setValues,
		setFieldValue,
		setFieldError,
		validateField,
		resetErrors,
		onSubmit,
		getInputProps,
		// Zod can report errors that aren't attached to a specific field
		formErrors,
		setFormErrors,
	}
}

const useSubmission = () => { }
