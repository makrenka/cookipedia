import { z } from "zod";
import Cookies from "js-cookie";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { trpc } from "../../lib/trpc";
import { zSignUpTrpcInput } from "@cookipedia/backend/src/router/signUp/input";
import { Alert } from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { getAllRecipiesRoute } from "../../lib/routes";
import { useForm } from "../../lib/form";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signUp = trpc.signUp.useMutation();

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: "",
      password: "",
      passwordAgain: "",
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: "custom",
            message: "Password must be the same",
            path: ["passwordAgain"],
          });
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set("token", token, { expires: 99999 });
      void trpcUtils.invalidate();
      navigate(getAllRecipiesRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Input
            label="Password again"
            name="passwordAgain"
            type="password"
            formik={formik}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
