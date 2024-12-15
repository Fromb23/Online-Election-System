const readline = require('readline');
const { County, Constituency, PollingStation } = require('./models'); // Adjust the path to your models

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function saveCounty(countyId, name) {
  const county = await County.create({ countyId, name });
  console.log(`Saved County: ${county.name}`);
  return county;
}

async function saveConstituency(constituencyId, name, countyId) {
  const constituency = await Constituency.create({ constituencyId, name, countyId });
  console.log(`Saved Constituency: ${constituency.name}`);
  return constituency;
}

async function savePollingStation(pollingStationId, name, constituencyId) {
  const pollingStation = await PollingStation.create({ pollingStationId, name, constituencyId });
  console.log(`Saved Polling Station: ${pollingStation.name}`);
  return pollingStation;
}

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  try {
    console.log('--- Database Population Tool ---');
    while (true) {
      // Input County details
      const countyId = await askQuestion('Enter County ID (or "exit" to quit): ');
      if (countyId.toLowerCase() === 'exit') break;

      const countyName = await askQuestion('Enter County Name: ');
      const county = await saveCounty(countyId, countyName);

      let constituencyAdded = false;

      while (true) {
        // Input Constituency details
        const constituencyId = await askQuestion(`Enter Constituency ID for ${countyName} (or "menu" to go back): `);
        if (constituencyId.toLowerCase() === 'menu') {
          if (!constituencyAdded) {
            console.log('You must add at least one constituency and one polling station before returning to the main menu.');
            continue;
          }
          break; // Break to add a new county
        }

        const constituencyName = await askQuestion('Enter Constituency Name: ');
        const constituency = await saveConstituency(constituencyId, constituencyName, countyId);

        let pollingStationAdded = false;

        while (true) {
          // Input Polling Station details
          const pollingStationId = await askQuestion(`Enter Polling Station ID for ${constituencyName} (or "back" to add another constituency): `);
          if (pollingStationId.toLowerCase() === 'back') {
            if (!pollingStationAdded) {
              console.log('You must add at least one polling station before adding another constituency.');
              continue;
            }
            break; // Break to add another constituency
          }

          const pollingStationName = await askQuestion('Enter Polling Station Name: ');
          await savePollingStation(pollingStationId, pollingStationName, constituencyId);
          pollingStationAdded = true;
        }

        constituencyAdded = true;
      }
    }

    console.log('--- Population Completed Successfully ---');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
}

main();