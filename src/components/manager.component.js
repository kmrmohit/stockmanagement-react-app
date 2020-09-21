import React, { Component } from "react";
import { render } from "@testing-library/react";
import CommonComponent from "./common.component";
import "./manager.component.css";

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

class Purchase {
  constructor(props) {
    this.name = props.name;
    this.description = props.description;
    this.cost = props.cost;
  }
}

export default class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      action: null,
      productsList: [],
      ordersList: [],
      suppliersList: [],
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
        var prodList = this.state.productsList.slice();
        prodList.push(newProd);
        console.log(prodList);
        this.setState({
          productsList: prodList,
        });
        break;

      case "Purchase":
        let newPurchase = new Purchase(
          props.name,
          props.description,
          props.cost
        );
        var prodList = this.state.productsList.slice();
        prodList.push(newProd);
        console.log(prodList);
        this.setState({
          productsList: prodList,
        });
        break;

      case "Supplier":
        break;

      case "Sales":
        break;

      default:
        break;
    }
  };

  updateItem = (id, obj) => {
    this.setState({
      action: "update",
    });
    switch (this.state.current) {
      case "Product":
        var prodList = this.state.productsList.slice();
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

      default:
        break;
    }
  };

  render() {
    return (
      <div className="manager-root">
        <h2>Manager Screen</h2>
        <div class="list-group">
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
