import React, { useState } from "react";
import { useEffect } from "react";
import {
  Form,
  Container,
  Button,
  Modal,
  ModalBody,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { MdOutlineDeveloperBoard } from "react-icons/md";
import { TodoItem, Categories } from "../models/todoItem";

export interface ITodoDetailsProps {
  todo: TodoItem;
  edit: boolean;
  handleClose: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (e: React.FormEvent, orderId: number) => void;
  editTodoName: string;
  editTodoDescription: string;
  editTodoCategory: Categories;
  setEditTodoCategory: React.Dispatch<React.SetStateAction<Categories>>;
}

const TodoDetails: React.FunctionComponent<ITodoDetailsProps> = ({
  todo,
  edit,
  handleClose,
  handleNameChange,
  handleEdit,
  handleDescriptionChange,
  editTodoName,
  editTodoDescription,
  editTodoCategory,
  setEditTodoCategory,
}) => {
  const [name, setName] = useState(editTodoName);
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState(editTodoDescription);
  const [descriptionDirty, setDescriptionDirty] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "description":
        setDescriptionDirty(true);
        break;
    }
  };
  const categoryHandler = (category: Categories): void => {
    setEditTodoCategory(category);
  };
  useEffect(() => {
    switch (editTodoCategory) {
      case Categories.NoCategory:
        setCategoryName("No category");
        break;
      case Categories.Home:
        setCategoryName("Home");
        break;
      case Categories.Work:
        setCategoryName("Work");
        break;
      case Categories.Entertaiment:
        setCategoryName("Entertaiment");
        break;
    }
  }, [editTodoCategory]);

  useEffect(() => {
    setNameError("");
    setDescriptionError("");
  }, [edit]);

  useEffect(() => {
    if (nameError || descriptionError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [nameError, descriptionError]);
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1 || e.target.value.length > 50) {
      setNameError("Name shouldn't empty and longer than 50 characters");
    } else {
      setNameError("");
      handleNameChange(e);
    }
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 300) {
      setDescriptionError("Description shouldn't longer than 300 characters");
    } else {
      setDescriptionError("");
      handleDescriptionChange(e);
    }
  };

  return (
    <>
      <Modal show={edit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editForm">
            <Form.Group controlId="taskName">
              <Form.Label>Name</Form.Label>
              {nameDirty && nameError && (
                <div style={{ color: "red" }}>{nameError}</div>
              )}
              <Form.Control
                onBlur={blurHandler}
                type="text"
                name="name"
                placeholder="Enter task name"
                defaultValue={name}
                onChange={nameHandler}
              />
            </Form.Group>
            <Form.Group controlId="taskDetails">
              <Form.Label>Description</Form.Label>
              {descriptionDirty && descriptionError && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {descriptionError}
                </div>
              )}
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter task details"
                defaultValue={description}
                onBlur={blurHandler}
                name="description"
                onChange={descriptionHandler}
              />
            </Form.Group>
            <Form.Group controlId="taskCategory">
              <Form.Label>Category</Form.Label>
              <DropdownButton id="dropdown-basic-button" title={categoryName}>
                <Dropdown.Item
                  onClick={() => categoryHandler(Categories.NoCategory)}
                >
                  No category
                </Dropdown.Item>
                <Dropdown.Item onClick={() => categoryHandler(Categories.Home)}>
                  Home
                </Dropdown.Item>
                <Dropdown.Item onClick={() => categoryHandler(Categories.Work)}>
                  Work
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => categoryHandler(Categories.Entertaiment)}
                >
                  Entertaiment
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-2 button"
              onClick={(e) => handleEdit(e, todo.orderId)}
              disabled={!isFormValid}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TodoDetails;
