function spinnerState(flag)
{
  const spinner = document.querySelector('.spinner');
  if(flag)
  {
    spinner.style.display = 'flex';
  }
  else
  {
    spinner.style.display = 'none';
  }
}

function showForm(form)
{
  if (form == 'formData')
  {
    formData.classList.remove('d-none');
    formAbm.classList.add('d-none');
  } 
  else
  {
    formData.classList.add('d-none');
    formAbm.classList.remove('d-none');
  }
}

function parsearJson(obj) 
{
  return obj.map((element)=>
  {
    if(Terrestre.esTerrestre(element))
    {
      return new Terrestre(element);
    }
    else if(Aereo.esAereo(element))
    {
      return new Aereo(element);
    }
  });
}

function fillTable(json) 
{
  tbody.innerHTML = '';
  
  json.forEach((element) => { tbody.innerHTML += element.toString(); });
  
  const modifierButtons = document.querySelectorAll('.btn--modificar');
  modifierButtons.forEach((modifierButton) =>
  {
    modifierButton.addEventListener('click', () =>
    {
      titulo.textContent = 'Form ABM - Modificar';
      titulo.dataset.tipo = 'modificar';
      showForm('formAbm');
      const tr = modifierButton.parentElement.parentElement;
      let element = json.filter((n) => n.id == tr.dataset.id)[0];
      fillAbm(element);
    });
  });

  const deleteButtons = document.querySelectorAll('.btn--eliminar');
  deleteButtons.forEach((deleteButton) =>
  {
    deleteButton.addEventListener('click', () =>
    {
      titulo.textContent = 'Form ABM - Eliminar';
      titulo.dataset.tipo = 'eliminar';
      showForm('formAbm');
      const tr = deleteButton.parentElement.parentElement;
      fillAbm(json.filter((n) => n.id == tr.dataset.id)[0]);
    });
  });
}

function selectChange()
{
  if (selectAbm.value == 'terrestre')
  {
    terrestre.classList.remove('d-none');
    aereo.classList.add('d-none');
  }
  else if (selectAbm.value == 'aereo')
  {
    terrestre.classList.add('d-none');
    aereo.classList.remove('d-none');
  }
  else
  {
    window.alert('Se modifico el HTML, error en selectChange()');
  }
}

function fillAbm(obj)
{
  idAbm.dataset.id = obj.id;
  idAbm.value = obj.id;
  modeloAbm.value = obj.modelo;
  anoFabAbm.value = obj.anoFab;
  velMaxAbm.value = obj.velMax;

  if (obj instanceof Terrestre)
  {
    selectAbm.value = 'terrestre';
    selectChange();
    cantPueAbm.value = obj.cantPue;
    cantRueAbm.value = obj.cantRue;
  }
  else if (obj instanceof Aereo)
  {
    selectAbm.value = 'aereo';
    selectChange();
    autonomiaAbm.value = obj.autonomia;
    altMaxAbm.value = obj.altMax;
  }
  else
  {
    window.alert('Error al fillAbm()');
  }

  selectAbm.setAttribute('disabled', 'true');
}

function maximun(n, m)
{
  return n.id > m.id ? n : m;
}

function validateInputs()
{
  if (
    (idAbm.value || idAbm.dataset.id) 
    && modeloAbm.value
    && anoFabAbm.value && isNaN(anoFabAbm.value) == false && Number.parseInt(anoFabAbm.value) > 1885
    && velMaxAbm.value && isNaN(velMaxAbm.value) == false  && Number.parseInt(velMaxAbm.value) > 0
    )
  {
    if (selectAbm.value == 'aereo')
    {
      if (
        altMaxAbm.value && isNaN(altMaxAbm.value) == false  && Number.parseInt(altMaxAbm.value) > 0
        && autonomiaAbm.value && isNaN(autonomiaAbm.value) == false  && Number.parseInt(autonomiaAbm.value) > 0
        )
      {
        return true;
      }
    }
    else if (selectAbm.value == 'terrestre')
    {
      if (
        cantPueAbm.value && isNaN(cantPueAbm.value) == false  && Number.parseInt(cantPueAbm.value) > -1
        && cantRueAbm.value && isNaN(cantRueAbm.value) == false  && Number.parseInt(cantRueAbm.value) > 0
      ) 
      {
        return true;
      }
    }
    else
    {
      window.alert('Error en validateInputs()');
    }
  }
  return false;
}

function registration()
{
  if(validateInputs())
  {
    if(window.confirm('Para dar de alta presionar "ok" , caso contrario "cancelar"'))
    {
      if(selectAbm.value == "aereo")
      {
        let id = parseInt(idAbm.dataset.id);
        let modelo = modeloAbm.value;
        let anoFab = anoFabAbm.value;
        let velMax = parseInt(velMaxAbm.value);
        let altMax = altMaxAbm.value;
        let autonomia = autonomiaAbm.value;
        vehiculo = new Aereo({id, modelo, anoFab, velMax, altMax, autonomia});
      }
      else if(selectAbm.value == "terrestre")
      {
        let id = parseInt(idAbm.dataset.id);
        let modelo = modeloAbm.value;
        let anoFab = anoFabAbm.value;
        let velMax = parseInt(velMaxAbm.value);
        let cantPue = cantPueAbm.value;
        let cantRue = parseInt(cantRueAbm.value);
        vehiculo = new Terrestre({id, modelo, anoFab, velMax, cantPue, cantRue});
      }
      else
      {
        window.alert("Error al dar un alta. No se identifica el tipo de vehiculo");
        return -1;
      }
      
      delete vehiculo.id;
      XMLHttpRequestRegistration(vehiculo, okRegistration, wrongRegistration);
    }
  }
  else
  {
    window.alert("Datos incorrectos, no ha pasado la validación. Verifique sus datos por favor");
  }
}

function findIndex(json, id)
{
  let length = json.length;
  for (let i = 0; i < length; i++)
  {
    if (json[i].id == id)
    {
      return i;
    }
  }
  return -1;
}

function modification()
{
  if(validateInputs())
  {
    if(window.confirm('Para modificar presionar "ok" , caso contrario "cancelar"'))
    {    
      let index = findIndex(json, idAbm.dataset.id);
      if(index == -1)
      {
        window.alert("Error al dar un modificar");
      }
      else
      {
        asyncAwaitModification(json[index],okModification,wrongModification);
      }
    }

  }
  else
  {
    window.alert("Datos incorrectos, no ha pasado la validación. Verifique sus datos por favor");
  }
}

function elimination()
{
  if(window.confirm('Para Eliminar presionar "ok" , caso contrario "cancelar"'))
  {
    asyncAwaitElimination(idAbm.dataset.id,OkElimination,WrongElimination); 
  }
}