import { Oval } from  'react-loader-spinner'

export const Spinner = (): JSX.Element => {
  return (
    <Oval
      height={180}
      width={180}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  )
}
