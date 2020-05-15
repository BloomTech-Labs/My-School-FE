import React from 'react';

export default function EntryCard(props)  {
    return (
       <div>
           {/* SUBJECT ICON OR OTHER GRAPHIC? IMAGES FROM DATABASE? */}
                <p>Title: {props.entry.title}</p>
                <p>Date: {props.entry.submission-date}</p>
                <p>Subject: {props.entry.subject}</p>
        </div>
    )
  }
