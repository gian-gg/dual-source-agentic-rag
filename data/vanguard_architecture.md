# Technical Specification: Project Vanguard

## Overview

Project Vanguard is our internal proprietary distributed key-value store designed to handle over 1 million requests per second with sub-5ms latency.

## Core Components

1. **The Orchestrator (Node-Alpha):** Manages shard distribution and health checks.
2. **The Data Shards (L-Series):** Storage nodes utilizing NVMe-optimized write paths.
3. **The Sentinel:** A monitoring layer that triggers auto-scaling in AWS us-east-1.

## Consistency Model

Vanguard utilizes **Eventual Consistency** by default but can be configured for **Strong Consistency** at the cost of 15% increased latency.
