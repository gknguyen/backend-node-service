import { ValidationError } from 'class-validator';

export function traverseValidationError(errors: ValidationError[]): ValidationError {
  const subErrors = {} as any;
  for (const error of errors) {
    if (error.children?.length) subErrors[error.property] = traverseValidationError(error.children);
    else subErrors[error.property] = Object.values(error.constraints ?? {}).join(', ');
  }
  return subErrors;
}
