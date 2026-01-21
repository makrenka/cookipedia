import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import Cookies from "js-cookie";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { trpc } from "../../lib/trpc";
import { Alert } from "../../components/Alert";
import { zSignInTrpcInput } from "@cookipedia/backend/src/router/signIn/input";
import { useNavigate } from "react-router-dom";
import { getAllRecipiesRoute } from "../../lib/routes";

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signIn = trpc.signIn.useMutation();

  const formik = useFormik({
    initialValues: {
      nick: "",
      password: "",
    },
    validate: withZodSchema(zSignInTrpcInput) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        const { token } = await signIn.mutateAsync(values);
        Cookies.set("token", token, { expires: 99999 });
        void trpcUtils.invalidate();
        navigate(getAllRecipiesRoute());
      } catch (
        error: any // eslint-disable-line @typescript-eslint/no-explicit-any
      ) {
        setSubmittingError(error.message);
      }
    },
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
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
