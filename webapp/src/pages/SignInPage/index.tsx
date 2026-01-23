import Cookies from "js-cookie";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { trpc } from "../../lib/trpc";
import { zSignInTrpcInput } from "@cookipedia/backend/src/router/signIn/input";
import { useNavigate } from "react-router-dom";
import { getAllRecipiesRoute } from "../../lib/routes";
import { Alert } from "../../components/Alert";
import { useForm } from "../../lib/form";

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signIn = trpc.signIn.useMutation();

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: "",
      password: "",
    },
    validationSchema: zSignInTrpcInput as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set("token", token, { expires: 99999 });
      void trpcUtils.invalidate();
      navigate(getAllRecipiesRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
