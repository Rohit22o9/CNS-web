import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { UnitPage } from './components/UnitPage';
import { unitsData } from './data/unitsData';

function App() {
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  const selectedUnit = unitsData.find((unit) => unit.id === selectedUnitId);
  const hasNextUnit = selectedUnitId !== null && unitsData.some((u) => u.id === selectedUnitId + 1);

  return (
    <>
      {selectedUnitId === null || !selectedUnit ? (
        <LandingPage
          units={unitsData}
          onSelectUnit={(unitId) => setSelectedUnitId(unitId)}
        />
      ) : (
        <UnitPage
          unit={selectedUnit}
          onBackToHome={() => setSelectedUnitId(null)}
          onSelectUnit={(unitId) => setSelectedUnitId(unitId)}
          hasNextUnit={hasNextUnit}
        />
      )}
    </>
  );
}

export default App;
