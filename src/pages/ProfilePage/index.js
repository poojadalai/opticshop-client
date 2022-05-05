import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "../../components/AddressForm";
import { deleteAddress } from "../../store/user/actions";
import { selectAdresses, selectUser } from "../../store/user/selectors";
import "./styles.css";

export default function ProfilePage() {
  const allAddress = useSelector(selectAdresses);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const avatar = [
    "https://bootdey.com/img/Content/avatar/avatar1.png",
    "https://bootdey.com/img/Content/avatar/avatar2.png",
    "https://bootdey.com/img/Content/avatar/avatar3.png",
    "https://bootdey.com/img/Content/avatar/avatar4.png",
    "https://bootdey.com/img/Content/avatar/avatar5.png",
    "https://bootdey.com/img/Content/avatar/avatar6.png",
    "https://bootdey.com/img/Content/avatar/avatar7.png",
  ];

  useEffect(() => {}, [allAddress]);
  if (!allAddress) return <p>No Address Found</p>;

  const random = Math.floor(Math.random() * avatar.length);

  return (
    <div className="container p-5">
      <div className="main-body">
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/profile">User</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Profile
            </li>
          </ol>
        </nav>

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={avatar[random]}
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4 className="text-uppercase">{user.name}</h4>
                    <p className="text-muted font-size-sm">
                      {allAddress[0]?.address}
                    </p>
                    <button className="mb-2 btn btn-primary">My Profile</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md-row">
              <AddressForm />
            </div>
          </div>

          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.name}</div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.email}</div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {allAddress[0]?.phone}
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">City</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {allAddress[0]?.city}
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {allAddress[0]?.address}
                  </div>
                </div>
                <hr></hr>
              </div>
            </div>
            <div className="col">
              <div className="p-2">Addresses</div>
              <ul className="list-group" style={{ borderRadius: "10px" }}>
                {allAddress?.map((userAdd, index) => (
                  <div>
                    <li className="list-group-item" key={index}>
                      {userAdd.address}-{userAdd.zipcode}
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginLeft: "25px" }}
                        onClick={() => {
                          dispatch(deleteAddress(userAdd.id));
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
