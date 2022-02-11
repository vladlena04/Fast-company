import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => userId !== user._id));
  }

  const getCase = (number) => {
    const lastDigit = number % 10
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${number} человека тусанут с тобой сегодня`
    } else if (number === 0) {
      return `Никто с тобой не тусанет`
    } else return `${number} человек тусанут с тобой сегодня`
  }

  const renderPhrase = (number) => {
    return number > 0 ? (
      <span className="badge bg-primary">{getCase(number)}</span>
    ) : (
      <span className="badge bg-danger">{getCase(number)}</span>
    )
  }

  const getQualityClass = (quality) => {
    let qualities = "badge p-2 m-1 bg-"
    qualities += quality
    return qualities;
  }

  const renderQualities = (qualities) => {
    return qualities.map((quality) => (
      <span
        key={quality._id}
        className={getQualityClass(quality.color)}
        badge-padding="10px"
      >
        {quality.name}
      </span>
    ))
  }

  const renderHeaders = () => {
    return (
      users.length !== 0 && (
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
        </tr>
      )
    )
  }

  const renderUsers = () => {
    return (
      users.length !== 0 &&
      users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{renderQualities(user.qualities)}</td>
          <td key={user.profession._id}>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(user._id)}
            >
              delete
            </button>
          </td>
        </tr>
      ))
    )
  }
  return (
    <>
      <h1>{renderPhrase(users.length)}</h1>
      <table className="table">
        <thead>{renderHeaders()}</thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  )
}

export default Users