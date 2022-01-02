import Modal from '../UI/Modal';
import LoginForm from '../Forms/LoginForm';
import CreateAccountForm from '../Forms/CreateAccountForm';

const LoginModal = props => {
  return (
    <Modal onCancel={props.onCancel}>
      {props.loginFormState ? (
        <LoginForm onSwitch={props.onSwitch} onCancel={props.onCancel} />
      ) : (
        <CreateAccountForm onCancel={props.onCancel} />
      )}
    </Modal>
  );
};
export default LoginModal;
