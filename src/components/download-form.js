import React, { useState } from 'react'
import tw from "tailwind.macro"
import { Heading, Label, Field, Btn } from "./type"

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function DownloadForm(props) {
    const [regitration, setRegitration] = useState({});
    const [formVisibility, setFormVisibility] = useState(true);

    const handleChange = (e) => {
      setRegitration({ ...regitration, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          ...regitration,
        }),
      })
        .then(() => {
          setFormVisibility(false);
        })
        .catch((error) => alert(error))
    }

    if (formVisibility === false) {
      return (
        <div css={tw`flex flex-col items-center text-center`}>
          <Heading css={tw`mb-10`}>Thanks</Heading>
        </div>
      )
    } else {
      return (
        <div css={tw`flex flex-col items-center`}>
          <Heading css={tw`text-center mb-10`}>Download the Impact Map</Heading>
          <form 
            name="downloadForm" 
            method="post"
            action="/success"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            id="subscribe-form"
            css={tw`flex flex-col w-full max-w-sm`}
          >
            <input type="hidden" name="downloadForm" value="downloadForm" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <Label htmlFor="name">
              Name
            </Label>
            <Field required name="name" type="text" placeholder="First and Last Name" onChange={handleChange}/>
            <Label htmlFor="email">
              Email Address
            </Label>
            <Field required name="email" type="email" placeholder="brandon@brandonhatton.com" onChange={handleChange}/>
            <Btn css={tw`max-w-xs mx-auto px-6`}>Submit</Btn>
          </form>
        </div>
      )
    }
}
