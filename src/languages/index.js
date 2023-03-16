const importers = import.meta.globEager('./lang-code/*.js');
const languages = {};
Object.keys(importers).forEach((fileName) => {
    const language = fileName.replace('./lang-code/', '').replace('.js', '');
    languages[language] = importers[fileName].default;
});
export default languages;
