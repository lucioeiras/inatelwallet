export default function Input({ Icon, fieldName, label, placeholder, type, onChange }) {
  return (
    <div className='flex flex-col w-80 mt-6'>
      <label 
        htmlFor={fieldName}
        className='text-gray-700 font-medium'
      >
        {label}
      </label>

      <div className='flex p-4 rounded-lg border-gray-200 border mt-2'>
        <Icon color='#A0AEC0' size={24} />
        <input
          name={fieldName}
          type={type ? type : 'text'}
          step='0.01'
          placeholder={placeholder}
          className='text-gray-700 ml-4 w-full placeholder:text-gray-400'
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}