import { yupResolver } from "@hookform/resolvers/yup";
import { NexusInput, PlatformButton } from "components";
import { ButtonType } from "enums/button-type";
import { get } from "lodash";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { planService } from "services";
import * as yup from "yup";
import Styles from "./index.module.css";

const initValues = {
  email: "",
  name: "",
};

interface Props {
  loadUsers?: () => void,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setUserAdded: React.Dispatch<React.SetStateAction<string>>,
}


export const UserForm = (props: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const requiredMessage = t("common.is_required");

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("common.enter_a_valid_email"))
      .required(`${t("common.email")} ${requiredMessage}`),
    name: yup.string().required(`${t("common.name")} ${requiredMessage}`),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initValues,
  });

  const onSubmit = async (values: { email: string; name: string }) => {
    try {
      setIsLoading(true);
      await planService.createUserLicenseAssignment(values.email, values.name);
      methods.reset(initValues);
      if (props.loadUsers) {
        await props.loadUsers();
      }
      props.setUserAdded(values.email);
    } catch (e) {
      const message = get(e, "response.data.message");
      toast.error(t(message));
    } finally {
      setIsLoading(false);
    }
  };

  const clearAndClose = () => {
    methods.reset(initValues);
    props.setIsOpen(false);
  };

  return (
    <>
      <label className={Styles.subtitle}>
        {t("user_plan_management.write_the_email_of_the_user_you_will_add")}
      </label>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={Styles.formContainer}
          id="add-user-form"
          data-testid="add-user-form"
        >
          <NexusInput label={`${t("common.name")} *`} name="name" variant="standard" />
          <NexusInput label={`${t("common.email")} *`} name="email" variant="standard" />
          <div className={Styles.actionContainer}>
            <PlatformButton
              onClick={clearAndClose}
              label={t("common.cancel")}
              isAlternative={true}
            />
            <PlatformButton
              isDisabled={isLoading}
              type={ButtonType.SUBMIT}
              label={t("user_plan_management.add_user")}
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};
