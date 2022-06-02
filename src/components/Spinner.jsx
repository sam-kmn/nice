import {CgSpinner} from 'react-icons/cg'


const Spinner = ({className}) => {
  return <CgSpinner className={`animate-spin text-4xl ${className}`} />
}

export default Spinner