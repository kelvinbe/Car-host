import EventModal from "./ReservedEventModal";
import BlockoutModal from "./BlockoutModal";
import useReservation from "../../../hooks/useReservation";
import { IReservation } from "../../../globaltypes";

export default function EventMainModal({
  eventId,
  isEvent,
  isOpen,
  onClose,
  startTime,
  endTime,
  event,
}: {
  eventId: string;
  isEvent: boolean;
  isOpen: boolean;
  onClose: () => void;
  startTime: string;
  endTime: string;
  event: Partial<IReservation> & {
    entityId?: string
  };

}) {
  const { selectedReservation } = useReservation(eventId);
    return (
        <>
        {isEvent ? (
            <BlockoutModal
            isOpen={isOpen}
            onClose={onClose}
            startTime={startTime}
            endTime={endTime}
            event={event}
            eventId={eventId}
            />
        ) : 
        <EventModal
            isOpen={isOpen}
            onClose={onClose}
            eventId={eventId}
            selectedReservation={selectedReservation}
          />}
        </>
    );
  
}
