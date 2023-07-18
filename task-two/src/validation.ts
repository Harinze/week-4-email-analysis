/**
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import fs from 'fs';
import dns from 'dns';

async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  console.log('Complete the implementation in src/validation.ts');

  const fsemails = fs.readFileSync(inputPath[0], 'utf8');
  const emails = fsemails.split('\n');
  emails.shift();
  emails.pop();
  // console.log(emails);
  const checkEmails: string[] = [];
  const formattedEmail: string[] = [];
  for (let j = 0; j < emails.length; j++) {
    formattedEmail.push(emails[j]);
    emails[j] = emails[j].split('@')[1];
    try {
      await resolveDNS(emails[j]);
      checkEmails.push(emails[j]);
    } catch (error) {
      console.log(error);
    }
  }
  let arrayOfValidEmails: string[] = [];
  let output = '';

  for (let i = 0; i < formattedEmail.length; i++) {
    for (let j = 0; j < checkEmails.length; j++) {
      if (formattedEmail[i].includes(checkEmails[j])) {
        arrayOfValidEmails.push(formattedEmail[i]);
      }
    }
  }

  const set = new Set(arrayOfValidEmails);
  arrayOfValidEmails = [...set];
  output = `Emails \n${arrayOfValidEmails.join('\n')}`;
  console.log(output);

  async function resolveDNS(params: string) {
    const validateDomains = new Promise((resolve, reject) => {
      try {
        dns.resolveMx(params, (error, addresses) => {
          if (error) {
            reject(error);
          } else {
            resolve(addresses);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });

    return validateDomains;
  }

  fs.writeFile(outputFile, output, 'utf-8', (err) => {
    if (err) console.log(err);
    else console.log('result saved');
  });
}
validateEmailAddresses(
  [
    '/Users/decagon/Desktop/week-4-task-Harinze/task-two/fixtures/inputs/small-sample.csv',
  ],
  'validation-json',
);
export default validateEmailAddresses;
