import { useForm, type Path, type RegisterOptions } from 'react-hook-form';

import styles from './OrderForm.module.scss';

// Mirrors server/config/constants.js — keep both in step.
const PHONE_PATTERN = /^\+?[0-9\s\-().]{7,20}$/;
const NAME_MAX = 100;
const ADDRESS_MAX = 255;

interface OrderFormValues {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
}

interface FieldError {
  field?: string;
  message?: string;
}

interface OrderFormProps {
  /** Resolves true when the order was accepted, which resets the form. */
  onSubmit: (values: OrderFormValues) => Promise<boolean>;
  isSubmitting: boolean;
  /** Field-level errors returned by the API. */
  fieldErrors?: FieldError[];
  /** Ties the external submit button to this form. */
  formId: string;
}

interface RenderFieldConfig {
  name: Path<OrderFormValues>;
  label: string;
  placeholder: string;
  type?: string;
  rules: RegisterOptions<OrderFormValues>;
}

/**
 * Delivery details form. Validation rules here match the express-validator
 * rules on POST /api/orders, so the user is told about a problem before a
 * request is ever sent.
 */
const OrderForm = ({ onSubmit, isSubmitting, fieldErrors = [], formId }: OrderFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    mode: 'onBlur',
    defaultValues: { customerName: '', customerPhone: '', deliveryAddress: '' },
  });

  const submit = async (values: OrderFormValues) => {
    const succeeded = await onSubmit(values);
    if (succeeded) reset();
  };

  /** Server-side validation for a field wins over the client-side message. */
  const errorFor = (field: keyof OrderFormValues): string | undefined =>
    fieldErrors.find((issue) => issue.field === field)?.message ?? errors[field]?.message;

  const renderField = ({ name, label, placeholder, type = 'text', rules }: RenderFieldConfig) => {
    const message = errorFor(name);
    const inputId = `${formId}-${name}`;

    return (
      <div className={styles.field}>
        <label className={styles.field__label} htmlFor={inputId}>
          {label}
        </label>
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          aria-invalid={message ? 'true' : 'false'}
          className={`${styles.field__input} ${message ? styles['field__input--invalid'] : ''}`}
          {...register(name, rules)}
        />
        {message ? (
          <span className={styles.field__error} role="alert">
            {message}
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <form id={formId} className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
      {renderField({
        name: 'customerName',
        label: 'Full name',
        placeholder: 'Jane Doe',
        rules: {
          required: 'Name is required.',
          maxLength: { value: NAME_MAX, message: `Name cannot exceed ${NAME_MAX} characters.` },
        },
      })}

      {renderField({
        name: 'customerPhone',
        label: 'Phone number',
        placeholder: '+1 555 123 4567',
        type: 'tel',
        rules: {
          required: 'Phone number is required.',
          pattern: { value: PHONE_PATTERN, message: 'Enter a valid phone number.' },
        },
      })}

      {renderField({
        name: 'deliveryAddress',
        label: 'Delivery address',
        placeholder: '221B Baker Street, London',
        rules: {
          required: 'Delivery address is required.',
          maxLength: {
            value: ADDRESS_MAX,
            message: `Address cannot exceed ${ADDRESS_MAX} characters.`,
          },
        },
      })}

      {/* The submit button lives in the drawer footer and targets this form by id. */}
      <button type="submit" className={styles.form__hiddenSubmit} disabled={isSubmitting}>
        Place order
      </button>
    </form>
  );
};

export default OrderForm;
