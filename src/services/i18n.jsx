import i18next from "i18next";

import { initReactI18next } from "react-i18next";

// "Inline" English and Arabic translations.

// We can localize to any language and any number of languages.

const resources = {

  de: {

    translation: {

      email_adress: "E-Mail Adress",
      password: "Passwort",
      login: "Einloggen",

      depart: "Abfahrtsort",
      arrival: "Ankunftsort",
      add: "Hinzufügen",
      delete: "Entfernen",
      view: "Anschauen",

      from: "Von",
      to: "Zu",

      error_title: "Seite nicht Gefunden!",
      go_back: "Zurück zum Start",

      day: "Tag",
      multiple_day_end:"e"
    },

  }

};

i18next

  .use(initReactI18next)

  .init({

    resources,

    lng: "en",

    interpolation: {

      escapeValue: false,

    },

  });

export default i18next;