class Vehiculo {
  id = 0;
  modelo = '';
  anoFab = '';
  velMax = 0;

  constructor(vehiculo = null) {
    if (vehiculo !== null) {
      this.id = vehiculo.id;
      this.modelo = vehiculo.modelo;
      this.anoFab = vehiculo.anoFab;
      this.velMax = vehiculo.velMax;
    }
  }

  toString() {
    return `
            <tr data-id="${this.id}">
              <td class="id">${this.id}</td>
              <td class="modelo">${this.modelo}</td>
              <td class="anoFab">${this.anoFab}</td>
              <td class="velMax">${this.velMax}</td>
            `;
  }
  static esVehiculo(obj) {
    return obj.hasOwnProperty("id") && obj.hasOwnProperty("modelo") && obj.hasOwnProperty("anoFab") && obj.hasOwnProperty("velMax");
  }
}

class Aereo extends Vehiculo {
  altMax = '';
  autonomia = '';

  constructor(aereo = null) {
    super(aereo);
    if (aereo !== null) {
      this.altMax = aereo.altMax;
      this.autonomia = aereo.autonomia;
    }
  }

  toString() {
    return `
              ${super.toString()}
              <td class="altMax">${this.altMax}</td>
              <td class="autonomia">${this.autonomia}</td>
              <td class="cantPue">N/A</td>
              <td class="cantRue">N/A</td>
              <td><input type="button" value="modificar" class="btn btn--modificar modificar"></td>
              <td><input type="button" value="eliminar" class="btn btn--eliminar eliminar"></td>
            </tr>
    `;
  }
  static esAereo(obj) {
    return Vehiculo.esVehiculo(obj) && obj.hasOwnProperty("altMax") && obj.hasOwnProperty("autonomia");
  }
}

class Terrestre extends Vehiculo {
  cantPue = '';
  cantRue = '';

  constructor(terrestre = null) {
    super(terrestre);
    if (terrestre !== null) {
      this.cantPue = terrestre.cantPue;
      this.cantRue = terrestre.cantRue;
    }
  }

  toString() {
    return `
            ${super.toString()}
            <td class="altMax">N/A</td>
            <td class="autonomia">N/A</td>
            <td class="cantPue">${this.cantPue}</td>
            <td class="cantRue">${this.cantRue}</td>
            <td><input type="button" value="modificar" class="btn btn--modificar modificar"></td>
            <td><input type="button" value="eliminar" class="btn btn--eliminar eliminar"></td>
          </tr>
    `;
  }
  static esTerrestre(obj) {
    return Vehiculo.esVehiculo(obj) && obj.hasOwnProperty("cantPue") && obj.hasOwnProperty("cantRue");
  }
}