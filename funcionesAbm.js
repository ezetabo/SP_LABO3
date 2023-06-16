    // ===================== fetchGeData =====================
    function okGetData(response) 
    {
      spinnerState(false);
      json = parsearJson(response);
      fillTable(json);
    }
    function wrongGetData()
    {
      datos.style.display = "none";
      error.classList.add('error--show');
      setTimeout(()=>{
        datos.style.display = "block";
        error.classList.remove('error--show');
        spinnerState(false);
      },3000);
    }
    function fetchGetData(ok, wrong)
    {
      spinnerState(true);
      fetch(urlBase,
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          referrerPolicy: 'no-referrer', 
        })
      .then(response => response.json())
      .then(response => ok(response))
      .catch(response => wrong(response));
    }
  
    // ===================== XMLHttpRequestRegistration =====================
    function okRegistration(response)
    {
      vehiculo.id = response.id;
      json = [...json,vehiculo];
      vehiculo = null;
      window.alert("Alta exitosa");
      spinnerState(false);
      fillTable(json);
      showForm("formData");
    }
    function wrongRegistration(error)
    {
      spinnerState(false);
      showForm("formData");
      console.log(error);
      window.alert(`ERROR ! : ${error}`);
    }
    function XMLHttpRequestRegistration(obj, ok, wrong)
    {
      spinnerState(true);
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function ()
      {
        if (this.readyState == 4)
        {
          if (this.status == 200)
          {
            ok(JSON.parse(this.responseText));
          } 
          else
          {
            wrong(this.responseText);
          }
        }
      };
      xhttp.open("PUT", urlBase, true);
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.send(JSON.stringify(obj));
    }
 
    // ===================== Fetch Async Await Modification =====================
    function okModification(response)
    {
      let index = findIndex(json, idAbm.dataset.id);
      if(selectAbm.value == "aereo")
      {
        json[index].id = parseInt(idAbm.dataset.id);
        json[index].modelo = modeloAbm.value;
        json[index].anoFab = anoFabAbm.value;
        json[index].velMax = parseInt(velMaxAbm.value);
        json[index].altMax = altMaxAbm.value;
        json[index].autonomia = autonomiaAbm.value;
      }
      else if(selectAbm.value == "terrestre")
      {
        json[index].id = parseInt(idAbm.dataset.id);
        json[index].modelo = modeloAbm.value;
        json[index].anoFab = anoFabAbm.value;
        json[index].velMax = parseInt(velMaxAbm.value);
        json[index].cantPue = cantPueAbm.value;
        json[index].cantRue = cantRueAbm.value;
      }
      else
      {
        window.alert("Error al hacer un modificar");
        return -1;
      }
      spinnerState(false);
      fillTable(json);
      showForm("formData");
      console.log(`${response} al modificar un registro`);
      window.alert(`${response} al modificar un registro`);
    }
    function wrongModification(error)
    {
      spinnerState(false);
      showForm("formData");
      console.log(error);
      window.alert(error);
    }
    async function asyncAwaitModification(obj, ok, wrong)
    {
      spinnerState(true);
      let response = await fetch(urlBase, 
      {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin',
          headers: {'Content-Type': 'application/json'},
          redirect: 'follow',
          referrerPolicy: 'no-referrer', 
          body: JSON.stringify(obj)
      });
      if(response.status == 200)
      {
          let answer = await response.text();
          ok(answer);
      }
      else
      {
        let error = await response.text();
        wrong(error);
      }
    }

    // ===================== FetchElimination =====================
    function OkElimination(response)
    {
      json = json.filter(n=>n.id != idAbm.dataset.id);
      spinnerState(false);
      showForm("formData");
      fillTable(json);
      console.log(`${response} al eliminar un registro`);
      window.alert(`${response} al eliminar un registro`);
    }
    function WrongElimination(error)
    {
      spinnerState(false);
      showForm("formData");
      console.log(error);
      window.alert(error);
    }
    async function asyncAwaitElimination(id , ok, wrong)
    {
      spinnerState(true);
      let response = await fetch(urlBase, 
      {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',        
        body: JSON.stringify({'id': id})
      })
      if(response.status==200)
      {
        let answer = await response.text();
        ok(answer);
      }
      else
      {
        let error = await response.text();
        wrong(error);
      }
    }  