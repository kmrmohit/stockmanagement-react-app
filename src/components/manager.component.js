import React, { Component } from "react";
import { render } from "@testing-library/react";
import CommonComponent from "./common.component";

export class Product {
  constructor(name, description, cost) {
    this.name = name;
    this.description = description;
    this.cost = cost;
  }
}

class Order {
  constructor(product, salesPerson, when) {
    this.product = product;
    this.salesPerson = salesPerson;
    this.when = when;
  }
}

class Supplier {
  constructor(name, dateJoined, productSupplied) {
    this.name = name;
    this.dateJoined = dateJoined;
    this.productSupplied = productSupplied;
  }
}

export default class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      action: null,
      productsList: [],
      orders: [],
      suppliers: [],
    };
  }

  showScreen = (param) => {
    this.setState({
      current: param,
    });
  };

  addItem = (props) => {
    this.setState({
      action: "add",
    });
    switch (this.state.current) {
      case "Product":
        let newProd = new Product(props.name, props.description, props.cost);
        let prodList = this.state.productsList.slice();
        prodList.push(newProd);
        console.log(prodList);
        this.setState({
          productsList: prodList,
        });
        break;

      case "Purchase":
        break;

      case "Supplier":
        break;

      case "Sales":
        break;
    }
  };

  updateItem = (id, obj) => {
    this.setState({
      action: "update",
    });
    switch (this.state.current) {
      case "Product":
        let prodList = this.state.productsList.slice();
        prodList[id] = obj;
        console.log(prodList);
        this.setState({
          productsList: prodList,
        });
        break;

      case "Purchase":
        break;

      case "Supplier":
        break;

      case "Sales":
        break;
    }
  };

  render() {
    return (
      <div class="manager-root">
        <h2 class="text-center">Manager Screen</h2>
        <div class="list-group list-group-horizontal">
          <button
            class="list-group-item"
            onClick={() => this.showScreen("Product")}
          >
            Product Details
          </button>
          <button
            class="list-group-item"
            onClick={() => this.showScreen("Purchase")}
          >
            Purchase Details
          </button>
          <button
            class="list-group-item"
            onClick={() => this.showScreen("Supplier")}
          >
            Supplier Details
          </button>
          <button
            class="list-group-item"
            onClick={() => this.showScreen("Sales")}
          >
            Sales Details
          </button>
        </div>

        <CommonComponent
          name={this.state.current}
          addItem={(obj) => this.addItem(obj)}
          updateItem={(id, obj) => this.updateItem(id, obj)}
          listAll={this.state.productsList.slice()}
        />
      </div>
    );
  }
}
