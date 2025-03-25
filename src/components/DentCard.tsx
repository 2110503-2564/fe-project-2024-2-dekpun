export function DentCard(
    { name, specialty, rating } 
    : { name: string, specialty: string, rating: number }) {
    return (
      <div className="p-6 border rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{specialty}</p>
        <p className="text-yellow-500">⭐ {rating}</p>
      </div>
    );
  }