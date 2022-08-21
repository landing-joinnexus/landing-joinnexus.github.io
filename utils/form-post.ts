export const formPost = (
  path: string,
  params: Record<string, string | undefined | null | number>,
) => {
  const form = document.createElement("form");
  form.method = "post";
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = String(params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
};
