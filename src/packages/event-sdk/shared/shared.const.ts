import { KafkaJS } from '@confluentinc/kafka-javascript';

export const EVENT_SDK_OPTIONS = 'EVENT_SDK_OPTIONS';
export const EVENT_SDK_CONSUMER_METADATA = 'EVENT_SDK_CONSUMER_METADATA';

export const EVENT_SDK_PRODUCER_TOKEN = 'EVENT_SDK_PRODUCER_TOKEN';
export const EVENT_SDK_CONSUMER_TOKEN = 'EVENT_SDK_CONSUMER_TOKEN';

export const EVENT_SDK_CONTEXT_TYPE = 'event-sdk';

export const RETRIABLE_ERROR_CODES = [
  KafkaJS.ErrorCodes.ERR__TRANSPORT, // Broker transport failure
  KafkaJS.ErrorCodes.ERR__RESOLVE, // Failed to resolve broker
  KafkaJS.ErrorCodes.ERR__MSG_TIMED_OUT, // Produced message timed out
  KafkaJS.ErrorCodes.ERR__ALL_BROKERS_DOWN, // All broker connections are down
  KafkaJS.ErrorCodes.ERR__TIMED_OUT, // Operation timed out
  KafkaJS.ErrorCodes.ERR__QUEUE_FULL, // Queue is full
  KafkaJS.ErrorCodes.ERR__WAIT_COORD, // Waiting for coordinator to become available
  KafkaJS.ErrorCodes.ERR__IN_PROGRESS, // Operation in progress
  KafkaJS.ErrorCodes.ERR__RETRY, // Retry operation
  KafkaJS.ErrorCodes.ERR_REQUEST_TIMED_OUT, // Request timed out
  KafkaJS.ErrorCodes.ERR_NOT_ENOUGH_REPLICAS, // Not enough in-sync replicas
  KafkaJS.ErrorCodes.ERR_NOT_ENOUGH_REPLICAS_AFTER_APPEND, // Message(s) written to insufficient number of in-sync replicas
  KafkaJS.ErrorCodes.ERR_REBALANCE_IN_PROGRESS, // Group rebalance in progress
  KafkaJS.ErrorCodes.ERR_COORDINATOR_LOAD_IN_PROGRESS, // Coordinator load in progress
  KafkaJS.ErrorCodes.ERR_GROUP_LOAD_IN_PROGRESS, // Group coordinator load in progress
  KafkaJS.ErrorCodes.ERR_COORDINATOR_NOT_AVAILABLE, // Coordinator not available
  KafkaJS.ErrorCodes.ERR_GROUP_COORDINATOR_NOT_AVAILABLE, // Group coordinator not available
  KafkaJS.ErrorCodes.ERR_NOT_COORDINATOR, // Not coordinator
  KafkaJS.ErrorCodes.ERR_NOT_COORDINATOR_FOR_GROUP, // Not coordinator for group
  KafkaJS.ErrorCodes.ERR_FENCED_LEADER_EPOCH, // Leader epoch is older than broker epoch
  KafkaJS.ErrorCodes.ERR_UNKNOWN_LEADER_EPOCH, // Leader epoch is newer than broker epoch
  KafkaJS.ErrorCodes.ERR_OFFSET_NOT_AVAILABLE, // Leader high watermark is not caught up
  KafkaJS.ErrorCodes.ERR_PREFERRED_LEADER_NOT_AVAILABLE, // Preferred leader was not available
  KafkaJS.ErrorCodes.ERR_ELIGIBLE_LEADERS_NOT_AVAILABLE, // Eligible partition leaders are not available
];
