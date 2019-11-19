import React from 'react'
import axios from 'axios'

export default function ListMail() {
  const [mails, setMails] = React.useState([
    {
    number: 0,
    name: '',
    nim: '',
    semester: '',
    sign: ''
    }
  ])

  React.useEffect(() => {
    axios.get('http://localhost:4000/list')
      .then(res => {
        setMails(res.data)
      })
  }, [])

  return (
    <div>
      <table>
        <tr>
          <th>Nomor Surat</th>
          <th>Nama</th>
          <th>Stambuk</th>
          <th>Semester</th>
          <th>TTD</th>
        </tr>
        {mails.map(mail => {
          return (
            <tr>
              <td>{mail.number}</td>
              <td>{mail.name}</td>
              <td>{mail.nim}</td>
              <td>{mail.semester}</td>
              <td>{mail.sign}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}