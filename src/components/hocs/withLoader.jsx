import Loader from '../Loader/Loader'

// хок withLoader принимает в себя компонент, который будет рендереться при выполнении условия
const withLoader = (WrappedComponent) => function ({ loading }) {
  if (loading) return <Loader />
  return <WrappedComponent />
}

export default withLoader
