export type FormFieldType = {
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    readonly?: boolean;
    // getUrl?: () => ReturnType<typeof useGetTrainingSessionsSheetQuery>;
    // postUrl?: () => ReturnType<typeof useAddTrainingSessionSheetMutation>;
    type:
    | "text"
    | "password"
    | "checkbox"
    | "select"
    | "file"
    | "email"
    | "date"
    | "keyValue"
    | "multiSelect"
    | "sheet"
    | "sheet2"
    | "stepper"
    | "number"
    | "guide"
    | "radio"
    | "dependency"
    | "selectInputType";
    options?: { label: string; value: number | string }[]; // for select
    dependency?: string;
    dynamicOptions?: boolean;
    filterBy?: { input: string, accessKey: string };
    extraProps?: object;
};