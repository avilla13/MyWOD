import { useState } from 'react';

export default function WodEditForm({ wod, onUpdate }) {
  const [formData, setFormData] = useState({
    name: wod.name,
    type: wod.type,
    rounds: wod.rounds,
    duration: wod.duration,
    movements: wod.movements,
  });

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value};
    setFormData(newFormData);
  }

  function handleMovementChange(idx, evt) {
    const newMovements = [...formData.movements];
    newMovements[idx][evt.target.name] = evt.target.value;
    setFormData({ ...formData, movements: newMovements });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdate(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Rounds</label>
        <input
          type="text"
          name="rounds"
          value={formData.rounds}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>      
      <div>
        {formData.movements.map((movement, idx) => (
          <div key={idx}>            
            <input
              type="text"
              name="movement"
              value={movement.movement}
              onChange={(evt) => handleMovementChange(idx, evt)}
            />
            <input
              type="number"
              name="reps"
              value={movement.reps}
              onChange={(evt) => handleMovementChange(idx, evt)}
            />
            <input
              type="text"
              name="weight"
              value={movement.weight}
              onChange={(evt) => handleMovementChange(idx, evt)}
            />            
          </div>
        ))}
      </div>
      <button type="submit">Update WOD</button>
    </form>
  );
}
