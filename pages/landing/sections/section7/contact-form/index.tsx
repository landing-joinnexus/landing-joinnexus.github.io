import { yupResolver } from "@hookform/resolvers/yup";
import { GameRoundedButton } from "components";
import { NexusInput } from "components/input";
import { ButtonType } from "enums/button-type";
import { environment } from "environment";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { post } from "utils";
import * as yup from "yup";
import Styles from "./index.module.css";

const { apiUrl } = environment;
const initValues = {
  name: "",
  email: "",
  affair: "",
  organization: "",
  message: "",
};

export const ContactForm = () => {
  const { t } = useTranslation();

  const requiredMessage = t("common.is_required");

  const validationSchema = yup.object().shape({
    name: yup.string().required(`${t("common.name")} ${requiredMessage}`),
    email: yup
      .string()
      .email(t("common.enter_a_valid_email"))
      .required(`${t("common.email")} ${requiredMessage}`),
    affair: yup.string().required(`${t("landing.contact_form.affair")} ${requiredMessage}`),
    organization: yup.string(),
    message: yup.string().required(`${t("landing.contact_form.message")} ${requiredMessage}`),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initValues,
  });

  const onSubmit = async (values: object) => {
    await post(`${apiUrl}/users/contact-form`, values);
    toast.success(t("landing.thank_you_for_your_interest"));
    methods.reset(initValues);
  };

  return (
    <div className={`centerContent`}>
      <div className={Styles.card}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={Styles.formContainer}
            id="contact-form"
            data-testid="contact-form"
          >
            <div className={Styles.title}>{t("landing.contact_form.label")}</div>
            <div className={Styles.contactInformation}>
              <NexusInput label={`${t("common.name")} *`} name="name" variant="standard" />
              <NexusInput label={`${t("common.email")} *`} name="email" variant="standard" />
              <NexusInput
                label={`${t("landing.contact_form.affair")} *`}
                name="affair"
                variant="standard"
              />
              <NexusInput
                label={`${t("landing.contact_form.organization")} *`}
                name="organization"
                variant="standard"
              />
            </div>
            <div className={Styles.message}>
              <NexusInput
                label={`${t("landing.contact_form.message")} *`}
                name="message"
                variant="standard"
                multiline
                rows={5}
              />
            </div>
            <div className={`${Styles.sendButton} center`}>
              <GameRoundedButton
                id="submit-button"
                type={ButtonType.SUBMIT}
                label={t("landing.contact_form.send")}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
