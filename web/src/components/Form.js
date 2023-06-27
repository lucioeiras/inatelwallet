import Input from './Input'

export default function Form({
  action,
  fields,
  buttonText
}) {
  return (
    <form onSubmit={action} className='flex flex-col items-center mt-2'>
      {fields.map(field => (
        <Input 
          key={field.name}
          fieldName={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          Icon={field.icon}
          onChange={field.onChange}
        />
      ))}

      <button
        type='submit'
        className='bg-blue-500 w-full rounded-lg p-4 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 mt-8'
      >
        { buttonText }
      </button>
    </form>
  )
}