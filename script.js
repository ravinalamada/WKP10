import faker from 'faker';

const tbody = document.querySelector('tbody');

let persons = Array.from({ length: 10 }, () => {
	return {
		id: faker.random.uuid(),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		jobTitle: faker.name.jobTitle(),
		jobArea: faker.name.jobArea(),
		phone: faker.phone.phoneNumber(),
		picture: faker.image.avatar(100, 100),
	};
});

const displayList = data => {
	tbody.innerHTML = data
		.map(
			(person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''} container">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td class="lastName">${person.lastName}</td>
        <td class="firstName">${person.firstName}</td>
        <td class="jobTitle">${person.jobTitle}</td>
        <td class="jobArea">${person.jobArea}</td>
        <td class="phone">${person.phone}</td>
        <td class="">
            <button class="edit">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
		)
    .join('');
};

const editPartner = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
	// code edit function here
};

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await editPartner(100);
  // remove it from the DOM
  popup.remove();
  // remove it from the js memory
  popup = null;
}

const editPartnerPopup = (e) => {
  const editBtn = e.target;
  if(editBtn.closest('button.edit')) {
    console.log('coloo');
      const parents = e.target.closest('.container');
      const lastName = parents.querySelector('.lastName').textContent;
      const firstName = parents.querySelector('.firstName').textContent;
      const jobTitle = parents.querySelector('.jobTitle').textContent;
      const jobArea = parents.querySelector('.jobArea').textContent;
      const phone = parents.querySelector('.phone').textContent;
        return new Promise(async function(resolve) {
          const popup = document.createElement('form');
          popup.classList.add('popup');
          popup.insertAdjacentHTML('afterbegin', `
            <fieldset>
              <label for="name"></label>
              <input type="text" name="inputLastName" value="${lastName}" id="name"/>
            </fieldset>
            <fieldset>
              <label for="firstName"></label>
              <input type="text" name="inputFirstName" value="${firstName}" id="firstName"/>
            </fieldset>
            <fieldset>
              <label for="jobTitle">Job title</label>
              <input type="text" name="inputJobTitle" value="${jobTitle}" id="obTitle"/>
            </fieldset>
            <fieldset>
              <label for="jobArea">Job area</label>
              <input type="text" name="inputJobArea" value="${jobArea}" id="jobArea"/>
            </fieldset>
            <fieldset>
              <label for="phone">Phone number</label>
              <input type="tel" name="inputPnone" value="${phone}" id="phone"/>
            </fieldset>
            <div>
              <button type="submit" class="submit-btn">Save the form</button>
              <button type="button" class="cancelForm">Cancel the form</button>
            </div>
          `);
          popup.addEventListener('submit', (e) => {
            e.preventDefault();
            // const formEL = e.currentTarget;
            const lastNameInput = e.target.inputLastName.value;
            const firstNameInput = e.target.inputFirstName.value;
            const jobTitleInput = e.target.inputJobTitle.value;
            const jobAreaInput= e.target.inputJobArea.value;
            const phoneNumberInput = e.target.inputPnone.value;
            // Put the content of the input
            firstNameInput.textContent = firstNameInput;
            lastNameInput.textContent = lastNameInput;
            jobAreaInput.textContent = jobAreaInput;
            jobTitleInput.textContent = jobTitleInput;
            phoneNumberInput.textContent = phoneNumberInput;
          });
        // when someone does submit it, resolve the data tht was in the input box
        // insert tht popup in the  DOM
          document.body.appendChild(popup);
          //put a very small titmeout before we add the open class
          await editPartner(10);
          popup.classList.add('open');
        });
      };
    };

    const cancelForm = (e) => {
      if(e.target.closest('button.cancelForm')) {
        console.log('delete me');
        const form = document.querySelector('.popup')
          form.classList.remove('open');
      }
    }

const deletePartner = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const deleteDeletePopup = (e) => {
  // create confirmation popup here
  if(e.target.closest('button.delete')) {
    return new Promise(async function(resolve) {
       const div = document.createElement('div');
       div.classList.add('deleteBtnContainer');
       div.insertAdjacentHTML('Afterbegin', `
          <p>Are you sure you to delete it</p>
          <button type="button" class="confirm">Yes</button>
          <button type="button" class="cancel">No</button>
      `);
      document.body.appendChild(div);
      //put a very small titmeout before we add the open class
      await editPartner(10);
      div.classList.add('open');
    });
  };

};

const deletePop = (e) => {
  return new Promise(async function(resolve) {
    if(e.target.closest('button.confirm')) {
      const tr = document.querySelector('.container');
      // console.log(tr);
      destroyPopup(tr);

      await editPartner(5);
      const divEL = document.querySelector('.deleteBtnContainer');
      console.log(divEL);
      destroyPopup(divEL);
    }
  });
};

const cancelDeleteBtn = (e) => {
  if(e.target.closest('button.cancel')) {
    const divEL = document.querySelector('.deleteBtnContainer');
    destroyPopup(divEL);
  };
}

displayList(persons);

window.addEventListener('click', editPartnerPopup);
window.addEventListener('click', deleteDeletePopup);
window.addEventListener('click', deletePop);
window.addEventListener('click', cancelForm);
window.addEventListener('click', cancelDeleteBtn);
