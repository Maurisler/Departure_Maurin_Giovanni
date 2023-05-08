import i18next from "i18next";

import { initReactI18next } from "react-i18next";

// "Inline" English and Arabic translations.

// We can localize to any language and any number of languages.

const resources = {

  de: {

    translation: {

        incorrect_email_or_password_try_again: "Die E-Mail oder das Password ist inkorrekt, versuche es nochmal!",

        placeholder_email: "E-Mail eingeben",
        placeholder_password: "Passwort eingeben",

        email_adress: "E-Mail Adresse",
        password: "Passwort",
        login: "Einloggen",

        saved_connections: "Gespeicherte Verbindungen",

        depart: "Abfahrtsort",
        arrival: "Ankunftsort",
        add: "Hinzufügen",
        delete: "Entfernen",
        view: "Anschauen",

        from: "Von",
        to: "Zu",

        error_title: "Seite nicht Gefunden!",
        go_back: "Zurück zum Start",

        missed_train: "Der Zug ist abgefahren",

        day: "Tag",
        multiple_day_end:"e",

        hour: "Stunde",
        multiple_hour_end: "n",

        unknown: "Nicht bekannt", 
        
        minute : "Minute",
        multiple_minute_end: "n",

        departs_in: "Abfahrt in", 
        delay: "Verspätung",
        status: "Status",
        duration: "Dauer",

        missed: "Abgefahren",
        available: "Verfügbar"
    },

  }

};

i18next

  .use(initReactI18next)

  .init({

    resources,

    lng: "de",

    interpolation: {

      escapeValue: false,

    },

  });

export default i18next;