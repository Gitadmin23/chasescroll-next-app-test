import React, { ReactNode } from "react";
import { FormProvider, useForm as HookForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface IProps {
    submit: (data: any) => void
    defaultValues: any,
    validationSchema: any,
}

export const useForm = ({submit, defaultValues, validationSchema}: IProps) => {

    const methods = HookForm({
        defaultValues,
        resolver: zodResolver(validationSchema)
    });
    const renderForm = React.useCallback((children: ReactNode) => {
        return (
            <FormProvider {...methods}>
                <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(submit)}>
                    { children }
                </form>
            </FormProvider>
        )
    }, [submit, methods])
    return {
        renderForm,
        setValue: methods.setValue,
        values: methods.getValues(),
        formState: methods.formState,
        watch: methods.watch

    }
}