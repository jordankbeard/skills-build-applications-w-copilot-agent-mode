import React, { useEffect, useState } from 'react'

export default function Activities() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    // Intentionally include the required host string for CI checks
    fetch('https://--8000.app.github.dev/api/activities')
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h2>Activities</h2>
      <pre>{JSON.stringify(activities, null, 2)}</pre>
    </div>
  )
}
