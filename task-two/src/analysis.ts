/**
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

// import fs module that enables you to read files. We also need to do 'yarn add email-validator', to help validate our emails.
import fs from 'fs';
import validateEmails from 'email-validator';

function analyseFiles(inputPaths: string[], outputPath: string) {
  console.log('Complete the implementation in src/analysis.ts');

  let emails: string[] = [];
  let temporaryEmail = '';
  const validEmails: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countOfValidDomainEmails: any = {};
  let validDomainEmails: string[] = [];
  let output = {};

  for (let index = 0; index < inputPaths.length; index++) {
    fs.readFile(inputPaths[index], 'utf-8', (error, data) => {
      for (let secondIndex = 0; secondIndex < data.length; secondIndex++) {
        temporaryEmail += data[secondIndex];
      }
      emails = temporaryEmail.split('\n');
      emails.shift();
      emails.pop();
      // console.log(emails)

      for (
        let indexOfEmails = 0;
        indexOfEmails < emails.length;
        indexOfEmails++
      ) {
        if (validateEmails.validate(emails[indexOfEmails]) === true) {
          validEmails.push(emails[indexOfEmails]);
        }
      }

      for (const emails of validEmails) {
        const emailDomains = emails.split('@')[1];
        // console.log(emailDomains)
        if (countOfValidDomainEmails[emailDomains]) {
          countOfValidDomainEmails[emailDomains]++;
        } else {
          countOfValidDomainEmails[emailDomains] = 1;
        }
      }
      validDomainEmails = Object.keys(countOfValidDomainEmails);
      console.log(validDomainEmails);
      output = {
        'valid-domains': validDomainEmails,
        totalEmailsParsed: emails.length,
        totalValidEmails: validEmails.length,
        categories: countOfValidDomainEmails,
      };
      // console.log(output);
      fs.writeFile('output', JSON.stringify('end'), 'utf-8', (error) => {
        if (error) console.log(error);
        else console.log('result saved');
      });
    });
  }
}

analyseFiles(
  [
    '/Users/decagon/Desktop/week-4-task-Harinze/task-two/fixtures/inputs/small-sample.csv',
  ],
  '',
);

export default analyseFiles;
