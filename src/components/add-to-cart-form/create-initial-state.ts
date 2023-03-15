interface Option {
  key: string;
  name: string;
  content: string | number;
}
interface Fields {
  name: string;
  placeholder: string;
  options: Option[];
}

export const createInitialState = (fields: Fields[]) => {
  return fields.reduce((acc, field) => {
    acc[field.name] = `${field.options[0].content}`;
    return acc;
  }, {} as Record<string, string>);
};
