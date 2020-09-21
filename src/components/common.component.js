import React, { Component } from "react";
import { render } from "@testing-library/react";
import Manager, { Product } from "./manager.component";
import "./common.component.css";

class AddComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      cost: "",
    };
  }

  nameChangeEvent = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  descChangeEvent = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  costChangeEvent = (event) => {
    this.setState({
      cost: event.target.value,
    });
  };

  render() {
    return this.props.condition ? (
      <div className="add-screen">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="prod-name">{this.props.name} Name</label>
            <input
              type="text"
              id="prod-name"
              class="form-control"
              value={this.state.name}
              onChange={this.nameChangeEvent}
            ></input>
          </div>
          <div class="form-group">
            <label for="prod-desc">{this.props.name} Description</label>
            <input
              type="text"
              id="prod-desc"
              class="form-control"
              value={this.state.description}
              onChange={this.descChangeEvent}
            ></input>
          </div>
          <div class="form-group">
            <label for="prod-cost">{this.props.name} Cost</label>
            <input
              type="text"
              id="prod-cost"
              class="form-control"
              value={this.state.cost}
              onChange={this.costChangeEvent}
            ></input>
          </div>
        </form>
        <button
          type="button"
          class="btn-add"
          onClick={() =>
            this.props.onClick(
              new Product(
                this.state.name,
                this.state.description,
                this.state.cost
              )
            )
          }
        >
          Submit
        </button>
      </div>
    ) : (
      ""
    );
  }
}

class HelpUpdateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item.name,
      description: props.item.description,
      cost: props.item.cost,
    };
  }

  nameChangeEvent = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  descChangeEvent = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  costChangeEvent = (event) => {
    this.setState({
      cost: event.target.value,
    });
  };

  render() {
    const item = this.props.item;
    const step = this.props.step;
    return (
      <form class="form-horizontal">
        <div class="form-group">
          <label for="prod-name">Name</label>
          <input
            type="text"
            class="form-control"
            value={this.state.name}
            onChange={this.nameChangeEvent}
          ></input>
        </div>
        <div class="form-group">
          <label for="prod-desc">Description</label>
          <input
            type="text"
            class="form-control"
            value={this.state.description}
            onChange={this.descChangeEvent}
          ></input>
        </div>
        <div class="form-group">
          <label for="prod-cost">{this.props.name} Cost</label>
          <input
            type="text"
            class="form-control"
            value={this.state.cost}
            onChange={this.costChangeEvent}
          ></input>
        </div>
        <button
          type="button"
          class="btn-add"
          onClick={() =>
            this.props.onClick(
              step,
              new Product(
                this.state.name,
                this.state.description,
                this.state.cost
              )
            )
          }
        >
          Update
        </button>
      </form>
    );
  }
}
class UpdateComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = this.props.prodList;
    items = items.map((item, step) => {
      return (
        <HelpUpdateComponent
          item={item}
          step={step}
          onClick={(id, obj) => {
            this.props.onClick(id, obj);
          }}
        />
      );
    });
    return <div className="update-screen">{items}</div>;
  }
}

export default class CommonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: null,
    };
  }
  showAddBox = () => {
    this.setState({
      condition: "add",
    });
  };

  sendAddItemToParent = (obj) => {
    this.setState({
      condition: null,
    });
    return this.props.addItem(obj);
  };

  sendUpdateItemToParent = (id, obj) => {
    this.setState({
      condition: null,
    });
    return this.props.updateItem(id, obj);
  };

  showUpdateBox = () => {
    this.setState({
      condition: "update",
    });
  };

  listAll = () => {
    this.setState({
      condition: "list",
    });
  };
  render() {
    let items = null;
    switch (this.props.name) {
      case "Product":
        items = this.props.listAll;
        items = items.map((item, step) => {
          return (
            <li key={step}>
              <div>{item.name}</div>
              <div>{item.description}</div>
              <div>{item.cost}</div>
            </li>
          );
        });
        break;

      case "Purchase":
        break;

      case "Supplier":
        break;

      case "Sales":
        break;
    }
    return this.props.name ? (
      <div className="control-screen">
        <h2>{this.props.name} Screen</h2>
        <div class="list-group">
          <button class="list-group-item" onClick={() => this.showAddBox()}>
            Add {this.props.name}
          </button>
          <button class="list-group-item" onClick={() => this.showUpdateBox()}>
            Update {this.props.name}
          </button>
          <button class="list-group-item" onClick={() => this.listAll()}>
            List {this.props.name}
          </button>
        </div>
        {this.state.condition === "add" ? (
          <AddComponent
            condition={this.state.condition}
            onClick={(obj) => this.sendAddItemToParent(obj)}
          />
        ) : null}
        {this.state.condition === "update" ? (
          <UpdateComponent
            condition={this.state.condition}
            prodList={this.props.listAll}
            onClick={(id, obj) => this.sendUpdateItemToParent(id, obj)}
          />
        ) : null}
        {this.state.condition === "list" ? <ol>{items}</ol> : null}
      </div>
    ) : (
      ""
    );
  }
}
